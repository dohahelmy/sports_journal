"use strict";

const gulp = require("gulp");
const {
	watch,
	series
} = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require('sass'));
const rename = require("gulp-rename");
const isChanged = require("gulp-changed");

const fileinclude = require("gulp-file-include");
const server = require("browser-sync").create();

const paths = {
	scripts: {
		src: "./",
		dest: "./build/",
	},
};

// Copy needed files
async function CopyFiles() {
	gulp
		.src([
			"src/**/*.*",
			// '!src/js/script.js',
			"!src/scss/**/*.*",
		])
		.pipe(isChanged("build/assets/"))
		.pipe(gulp.dest("build/assets/"));
}

// Main styles function
async function styles(source, newfile) {
	return gulp
		.src(source)
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(autoprefixer())
		.pipe(rename(newfile))
		.pipe(gulp.dest("build/assets/css"))
		.pipe(server.stream());
}

// Reload Server
async function reload() {
	server.reload();
}

async function includeHTML() {
	return gulp
		.src([
			"./*.html",
			"!./includes/**/*.*", // ignore
		])
		.pipe(
			fileinclude({
				prefix: "@@",
				basepath: "@file",
				context: {
					nav: [{
						text: 'كرة القدم',
						link: ''
					},
					{
						text: 'كرة السلة',
						link: ''
					},
					{
						text: 'التنس',
						link: ''
					},
					{
						text: 'الهوكي',
						link: ''
					},
					{
						text: 'الركبي',
						link: ''
					},
					{
						text: 'كرة القدم الأمريكية',
						link: ''
					},
					{
						text: 'البيسبول',
						link: ''
					},
					],
					social: [
						{
							icon: 'youtube',
							url: 'www.youtube.com'
						},
						{
							icon: 'twitter',
							url: 'www.twitter.com'
						},
						{
							icon: 'instagram',
							url: 'www.instagram.com'
						},
						{
							icon: 'facebook',
							url: 'www.facebook.com'
						},
					],
					footer: [
						{
							text: 'من نحن',
							link: ''
						},
						{
							text: 'أخبار',
							link: ''
						},
						{
							text: 'سياسة الخصوصية',
							link: ''
						},
						{
							text: 'شروط الاستخدام',
							link: ''
						},
						{
							text: 'أعلن معنا',
							link: ''
						},
						{
							text: 'كأس العالم 2022',
							link: ''
						},
						{
							text: 'وظائف شاغرة',
							link: ''
						},
						{
							text: 'اتصل بنا',
							link: ''
						},
					]
				},
			})
		)
		.pipe(gulp.dest(paths.scripts.dest));
}

exports.includeHTML = includeHTML;

// Build files html and reload server
async function buildAndReload() {
	CopyFiles();
	styles("src/scss/style.scss", "main.css");
	await includeHTML();
	reload();
}

exports.default = async function () {
	// Init serve files from the build folder
	server.init({
		server: {
			baseDir: paths.scripts.dest,
		},
	});
	// Build and reload at the first time
	buildAndReload();
	// Watch task
	watch(
		["./index.html", './*.html', "./includes/**/*.*", "src/**/*.*"],
		series(buildAndReload)
	);
};