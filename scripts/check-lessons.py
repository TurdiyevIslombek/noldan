"""
Runs every Python block in every lesson, in course order, in one shared
session — the way a student typing along in Colab would — and compares
each block's output with the output block printed right after it.

    npm run check:lessons          mismatches and a summary
    npm run check:lessons -- -v    every block

Later lessons use functions defined in earlier ones, so the order
matters. A block that never finishes (lessons show infinite loops on
purpose) is cut off after a few seconds. Exits with 1 on any mismatch,
so it can guard a deploy.
"""

import contextlib
import glob
import io
import re
import signal
import sys

VERBOSE = "-v" in sys.argv
LABELS = ("", "**Natija:**", "**Kutilgan natija:**")


class Capped(io.StringIO):
    """Output buffer that gives up on runaway loops."""

    def write(self, s):
        if self.tell() > 20_000:
            raise RuntimeError("too much output")
        return super().write(s)


class Timeout(Exception):
    pass


def on_alarm(*_):
    raise Timeout()


signal.signal(signal.SIGALRM, on_alarm)


def fences(lines):
    """Every fenced block before the production notes: (start, end, lang, code)."""
    out, i = [], 0
    while i < len(lines):
        m = re.match(r"^```(\w*)\s*$", lines[i].strip())
        if not m:
            i += 1
            continue
        j = i + 1
        while j < len(lines) and not re.match(r"^```\s*$", lines[j].strip()):
            j += 1
        out.append((i, j, m.group(1), "\n".join(lines[i + 1 : j]).rstrip()))
        i = j + 1
    return out


def run(code, ns):
    buf, err = Capped(), None
    try:
        signal.setitimer(signal.ITIMER_REAL, 5)
        with contextlib.redirect_stdout(buf):
            exec(compile(code, "<lesson>", "exec"), ns)
    except SyntaxError as e:
        err = f"{type(e).__name__}: {e.msg}"
    except (Timeout, RuntimeError):
        err = "(never finishes)"
    except Exception as e:  # the lessons raise errors on purpose
        err = f"{type(e).__name__}: {e}"
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
    return (buf.getvalue() + (err + "\n" if err else "")).rstrip()


def main():
    files = sorted(glob.glob("content/*/dars-*.md"))
    ns, checked, bad = {}, 0, 0
    for path in files:
        lines = open(path, encoding="utf-8").read().split("\n")
        blocks = fences(lines)
        for k, (start, end, lang, code) in enumerate(blocks):
            if lang != "python" or "___" in code:
                continue
            expected = None
            if k + 1 < len(blocks) and blocks[k + 1][2] == "":
                gap = lines[end + 1 : blocks[k + 1][0]]
                if all(l.strip() in LABELS for l in gap):
                    expected = blocks[k + 1][3].rstrip()
            got = run(code, ns)
            if expected is None:
                if VERBOSE:
                    print(f"  {path}:{start + 1}  (no printed output to compare)")
                continue
            checked += 1
            if got == expected:
                if VERBOSE:
                    print(f"  {path}:{start + 1}  ok")
                continue
            bad += 1
            print(f"\n✗ {path}:{start + 1}")
            print("  prints :", got.replace("\n", " ⏎ ")[:400])
            print("  lesson :", expected.replace("\n", " ⏎ ")[:400])
    print(f"\n{len(files)} lessons · {checked} code blocks compared with their printed output · {bad} mismatches\n")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
