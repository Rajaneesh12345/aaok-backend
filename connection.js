const mysql = require('mysql2');

function getNewConnectionObject() {
	const connection = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DBNAME,
	});

	// const connection = mysql.createConnection({
	// 	host: '127.0.0.1',
	// 	user: 'root',
	// 	password: 'Raj@142181',
	// 	database: 'stiller',
	// });
	return connection;
}

let string = `
SELECT people.PersonId,
      people.NameEnglish,
      NameKorean,
      NameHancha,
      IsChungin,
      IsCommoner,
      IsFemale,
      IsMarginalizedYangban,
      IsMonk,
      IsSlave,
      IsYangban, 
      TravelYearFrom,
      TravelYearTo,
      CalligraphyReg,
      CalligraphySealCursive
      ExamEnglish,
      ExamEnglTranslit,
      ExamHancha,
      ExamKorean,
      exams_taken.DateTaken as exam_date,
      FirstYearInGovPosition,GovTitleEnglish,GovTitleEnglTranslit,GovTitleHancha,GovTitleKorean,
      IsAgnatic,IsAgnaticAssociative,IsAssociative,
      ReignEnglish,
      picture_links.link,LocationInPicture,pictures.DateTaken as picture_date,LocationEngl, SublocationEngl, SublocationEnglTranslit, LocationEnglTranslit,
      SublocationHancha, SublocationHancha, 
      LocationKorean, LocationHancha
FROM people
LEFT JOIN pictured_in ON pictured_in.PersonId = people.PersonId
LEFT JOIN pictures ON pictures.PictureId = pictured_in.PictureId
LEFT JOIN locations ON locations.LocationId = pictures.LocatedAt
LEFT JOIN exams_taken ON exams_taken.PersonId=people.PersonId
LEFT JOIN exams ON exams.ExamId = exams_taken.Exam
LEFT JOIN government_individual ON government_individual.PersonId=people.PersonId
LEFT JOIN government_title ON government_title.GovernmentTitleId=government_individual.GovernmentTitleId
LEFT JOIN clusters ON clusters.ClusterId=pictured_in.ContainedInCluster
LEFT JOIN reigns_lived_in ON reigns_lived_in.PeopleId=people.PersonId
LEFT JOIN reigns ON reigns.ReignId=reigns_lived_in.ReignId
LEFT JOIN picture_links ON picture_links.PictureId=pictures.PictureId `;

const ref = {
	Calligraphy: 'CalligraphyReg',
	'Inscription Type': '',
	'Government Post': 'GovTitleEnglish',
	Location: 'LocationEngl',
	'Degree Holders': 'ExamEnglish',
};

module.exports = { getNewConnectionObject, string, ref };

const obj = {
	Calligraphy: ['sealCursive', 'regular'], //
	'Inscription Type': [
		'agnatic',
		'agnaticAssociative',
		'associative',
		'singleName',
	],
	'Government Post': [
		'accountant',
		'censor',
		'commander',
		'governor',
		'guard',
		'inspector',
		'magistrate', //
		'minister',
		'primeMinister', //
		'secretary',
		'stateCouncilor',
		'govUndeterminedOther',
	],
	Location: [
		'jadeStreamRavine',
		'manmulcho',
		'myogilsangBuddha',
		'nineDragonFalls',
	],
	'Social Status': [
		'chungin',
		'commoner',
		'female',
		'marginalizedYangban',
		'monk',
		'slave',
		'yangban',
		'ssUndetermined',
	],
	'Degree Holders': [
		'civilExam',
		'militaryExam',
		'technicalExam',
		'dhUndetermined',
	],
};
