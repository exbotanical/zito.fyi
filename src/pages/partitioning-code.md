---
title: Partitioning Code
subtitle: A Style Guide for Writing Semantically Structured Code
createdAt: 2021-08-28
slug: partitioning-code
---
In the body of a function:

- variable declarations should be grouped in a section, punctuated by a line of whitespace

  ```c
  char* words;
  int x, y;

  x = 9;
  y = 11;
  words = malloc(...)
  ```

- function declarations should be grouped in a section, punctuated by a line of whitespace

  ```js
  function doWork () {
    const noop = () => {};
    const toUnixTs = raw => new Date(raw)?.getTime() || 0;

    let today, yesterday;

    ...
  }
  ```

- control flow (e.g. if / else statements) should be grouped in a section, punctuated by a line of whitespace

  ```go
  func CreateEvent(w http.ResponseWriter, r *http.Request) {
    var e db.Event

    err := util.DecodeJSONBody(w, r, &e)

    if err != nil {
      var mr *util.MalformedRequest

      if errors.As(err, &mr) {
        util.FError(w, mr.Status, mr.Message)
      } else {
        util.FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
      }

      if (cond) ...
      else ...
    }
  }
  ```

- error checks should be grouped with the statement in which the error is defined

  ```go
  db, err := db.Connect()
  if err != nil {
    util.FError(w, http.StatusInternalServerError, "Database connection failed")
  }

  defer db.Close()

  err = db.CreateEvent(&e)
  if err != nil {
    util.FError(w, http.StatusInternalServerError, "Database write failed")
  }
  ```

  - For example, in Go, an idiomatic structure you will often see is:

  ```go
  handle, err := doThing()
  if err != nil {
    doAnotherThing()
  }
  ```

  or this idiom, assuming you won't need to use `handle`:

  ```go
  if err, handle := doThing(); err != nil {
    doAnotherThing()
  }
  ```

- return statements and cleanup logic (such as closing file handles) should be grouped in a section, *not* punctuated by a line of whitespace

  ```go
  if err != nil {
    var mr *util.MalformedRequest

    if errors.As(err, &mr) {
      util.FError(w, mr.Status, mr.Message)
    } else {
      util.FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
    }
    // the space before the return makes it easier to discern when scanning the code
    return
  }

  db, err := db.Connect()
  if err != nil {
    util.FError(w, http.StatusInternalServerError, "Database connection failed")

    return
  }
  ```

  Unless it is the sole statement in a structure:

  ```js
  try {
    ...
  } catch (ex) {
    return; // yes
  }

  if (predicate()) {
    return; // again, yes
  }
  ```

- logical blocks of flow control should be grouped in a section, and punctuated by a line of whitespace

  ```py
  def check_values(self):
    if self.a != self.b:
      ...
    else:
      ...


    if ...
      ...
    else
      ...

    ...
  ```

- a comment should be grouped with the following line(s) to which it applies, and should be preceded by a line of whitespace unless it is at the beginning of a logical structure

  ```js
  // comment about next line
  if (nextLine) {
    ...
  }

  function next () {
    // comment at beginning of logical structure
    if (thing) {
      ...
    }

    ...
  }
  ```
