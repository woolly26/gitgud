import subprocess
from io import StringIO

def run_linter(code):
    try:
        result = subprocess.run(
            ['flake8', '--stdin'],
            input=code,
            text=True,
            capture_output=True
        )
        return result.stdout
    except Exception as e:
        return str(e)

def auto_fix(code):
    try:
        result = subprocess.run(
            ['autopep8', '--stdin'],
            input=code,
            text=True,
            capture_output=True
        )
        return result.stdout
    except Exception as e:
        return str(e)
