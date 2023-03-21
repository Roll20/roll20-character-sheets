const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require('gulp-sass')(require('sass'));

gulp.task("scss", () => {
  return gulp.src("./scss/arc.scss")
      .pipe(sass({
        outputStyle: "expanded"
      }).on("error", sass.logError))
    .pipe(gulp.dest("../"))
})

gulp.task("html", function () {
  return gulp.src("./pug/arc.pug")
    .pipe(pug({
      pretty: true,
      locals: require("../translation.json")
    }))
    .pipe(gulp.dest("../"))
})

gulp.task("watch", gulp.series(["scss", "html"], () => {
  gulp.watch("./scss/**/*.scss", gulp.series(["scss"]))
  gulp.watch(["./pug/**/*.pug","./js/**/*.js"], gulp.series(["html"]))
}))

gulp.task("build", gulp.series(["scss", "html"]))
