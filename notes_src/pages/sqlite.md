# SQlite


## Triggers

Update timestamp after any change:

```sql
CREATE TRIGGER trigger_name AFTER UPDATE ON table_name
BEGIN
UPDATE notes SET updated = strftime('%Y-%m-%d %H:%M', 'now', 'localtime') WHERE id = new.id;
END;
```

Backup old version to a `revisions` table after any change to `table_name`.

```sql
CREATE TRIGGER trigger_name AFTER UPDATE ON table_name
BEGIN
INSERT INTO revisions
(reference_id, saved, title, content)
values
(new.id, old.updated, old.title, old.content);
END;
```

## Convert entire database to ASCII text file

    $ echo '.dump' | sqlite3 mydb.sqlite3 > mydb.ascii

...and then back again:

    $ cat mydb.ascii | sqlite3 mydb.sqlite3


## Misc.

Remove all carriage return characters (CR, `\r`, `^M`) in column:

```sql
UPDATE table_name SET dirty_col = replace(dirty_col, X'0D', '')
```
