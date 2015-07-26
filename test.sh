#!/usr/bin/env


ERR_LOG=/tmp/err.log
TMP_FILE=.tmp/coverage.tmp
OUT_DIR=reports
OUT_FILE=$OUT_DIR/coverage.html

rm- rf $OUT_DIR

gulp test --silent >$TMP_FILE 2>$ERR_LOG

cat $TMP_FILE | grep -v "\[conflict\]" > $OUT_FILE
