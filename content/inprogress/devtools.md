Shell environment

- A shell is not a terminal
- What is a terminal?
  - Good choices?
- What is a shell?
  - Choices?
  - Today we'll be using bash. Macos now defaults you to zsh, which is effectively a superset of bash so everything we learn today will work fine in both shells
  - A shell is an interface with userspace programs, many of which interface with the kernel
  - UNIX philosophy in the 1960s and 70s, pipe/garden hose quote
  - process mgmt - hard to do but shell makes it easy
  - when you open a shell the first thing that happens is it reads your rc file and "sources" it. source is kind of like an import statement in bash
  - anatomy of a script (show how to return if being sourced, show strict mode, explain shebang)
  - the shell spawns a new process, and you are typing into the runtime essentially. it's like a big bash repl with some special characteristics
  - when you run a command, the shell looks for it - if it's a builtin, execute. else, look it up on the PATH.
  - explain PATH
  - btw this prompt thingy is also controlled by an env var called PS1
  - How do you load env vars? Notice if I open a new shell the env var doesnt persist. Let's go back to that rc file
  - rc file loaded globally in shell parent process, available everywhere. executes in two modes - interactive and script
- Programs
  - so we explained programs are found on your PATH
  - tons of UNIX programs. macos darwin os is based on openbsd, which is linux. both are unix-like os
  - std unix utils like cat, ls, echo, ps, grep, awk, sed
  - let's look at some
  - newer tools: jq, htop, curl, openssl
  - pipes and processes - every program will be executed in a new subprocess
  - common unix directories and what they're for: /var and /var/log, /tmp, /usr, your home dir ~
  - ~ and .config, rc files
  - crontab and jobs - how to run regular tasks

IMPLEMENT WEBSOCKETS IN C DUDER
