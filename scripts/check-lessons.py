"""
Runs every Python block in every lesson, in course order, in one shared
session — the way a student typing along in Colab would — and compares
each block's output with the output block printed right after it.

    npm run check:lessons              lessons 01–15, about a minute
    npm run check:lessons -- --full    every lesson; downloads the corpus
                                       and trains for about 40 minutes
    npm run check:lessons -- -v        every block

Later lessons use functions defined in earlier ones, so the order
matters. A block that never finishes (lessons show infinite loops on
purpose) is cut off after a few seconds. A block that crashes without
the next block showing that error counts as a mismatch: the lesson uses
something it has not defined yet. Measured times differ from machine to
machine, so they are not compared. Exits with 1 on any mismatch, so it
can guard a deploy.
"""

import contextlib
import glob
import io
import os
import re
import shutil
import signal
import sys
import tempfile

VERBOSE = "-v" in sys.argv
FULL = "--full" in sys.argv
LAST_FAST = 15  # later lessons need the network and minutes of training
LIMIT = 3600 if FULL else 5
LABEL = re.compile(r"^(\*\*(Natija|Kutilgan natija):\*\*|\*\*(Natija|Kutilgan natija)\*\* \(.*\):)?$")
# "1.67 soniya", "0.468 s", "38 barobar" in a block that holds a stopwatch
TIMED = re.compile(r"\d+(\.\d+)?( ?(soniya|daqiqa|soat|s|barobar))\b")


class Capped(io.StringIO):
    """Output buffer that gives up on runaway loops."""

    def write(self, s):
        if self.tell() > 200_000:
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
    """Returns (printed output, the error it crashed with, if any)."""
    buf, err = Capped(), None
    try:
        signal.setitimer(signal.ITIMER_REAL, LIMIT)
        with contextlib.redirect_stdout(buf):
            exec(compile(code, "<lesson>", "exec"), ns)
    except SyntaxError as e:
        err = f"{type(e).__name__}: {e.msg}"
    except (Timeout, RuntimeError):
        return buf.getvalue().rstrip(), None
    except Exception as e:  # the lessons raise errors on purpose
        err = f"{type(e).__name__}: {e}"
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
    return (buf.getvalue() + (err + "\n" if err else "")).rstrip(), err


def same(got, expected, code):
    if "perf_counter" in code:
        got, expected = TIMED.sub("⏱", got), TIMED.sub("⏱", expected)
    return got == expected


def main():
    root = os.getcwd()
    files = sorted(glob.glob("content/*/dars-*.md"))
    if not FULL:
        files = [f for f in files if int(re.search(r"dars-(\d+)", f)[1]) <= LAST_FAST]
    files = [os.path.join(root, f) for f in files]

    # A student's Colab folder: lessons write files, and read the corpus.
    work = tempfile.mkdtemp(prefix="noldan-lessons-")
    shutil.copy("public/data/xom_korpus.jsonl", work)
    os.chdir(work)

    ns, checked, bad = {}, 0, 0
    for path in files:
        name = os.path.relpath(path, root)
        lines = open(path, encoding="utf-8").read().split("\n")
        blocks = fences(lines)
        for k, (start, end, lang, code) in enumerate(blocks):
            if lang != "python" or "___" in code or (not FULL and "load_dataset" in code):
                continue
            expected, following = None, ""
            if k + 1 < len(blocks) and blocks[k + 1][2] == "":
                following = blocks[k + 1][3]
                gap = lines[end + 1 : blocks[k + 1][0]]
                if all(LABEL.match(l.strip()) for l in gap):
                    expected = following.rstrip()
            got, crash = run(code, ns)
            if VERBOSE:
                print(f"  {name}:{start + 1}", flush=True)
            if expected is None and (not crash or crash.split(":")[0] in following):
                continue
            checked += 1
            if expected is not None and same(got, expected, code):
                continue
            bad += 1
            print(f"\n✗ {name}:{start + 1}", flush=True)
            print("  prints :", got.replace("\n", " ⏎ ")[:600])
            print("  lesson :", (expected or "(no output shown)").replace("\n", " ⏎ ")[:600], flush=True)
    os.chdir(root)
    shutil.rmtree(work, ignore_errors=True)
    print(f"\n{len(files)} lessons · {checked} code blocks compared with their printed output · {bad} mismatches\n")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
