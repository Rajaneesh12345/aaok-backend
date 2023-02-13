let { getNewConnectionObject, string: str, ref } = require('../connection');

exports.search = (req, res) => {
	const connection = getNewConnectionObject();

	const {
		filters: { advancedFilters, nameFilter },
		sort,
	} = req.body;

	let string = str;
	for (let key in advancedFilters) {
		if (key === 'Calligraphy') {
			if (advancedFilters[key].length >= 1) {
				const calligraphy = advancedFilters[key].map(i => {
					if (i === 'sealCursive') return 1;
					if (i === 'regular') return 0;
				});

				string += `WHERE ${ref.Calligraphy} IN (${calligraphy + ''}) `;
				continue;
			} else {
				string += `WHERE people.PersonId is NOT NULL `;
			}
		}
		if (key === 'Inscription Type' && advancedFilters[key].length >= 1) {
			advancedFilters[key].map(i => {
				if (i === 'agnatic') {
					string += `AND isAgnatic = 1 `;
					return 'IsAgnatic';
				}
				if (i === 'agnaticAssociative') {
					string += `AND IsAgnaticAssociative = 1 `;
					return 'IsAgnaticAssociative';
				}
				if (i === 'associative') {
					string += `AND IsAssociative = 1 `;
					return 'IsAssociative';
				}
			});
			continue;
		}
		if (key === 'Government Post' && advancedFilters[key].length >= 1) {
			string += `AND ${ref['Government Post']} REGEXP "${advancedFilters[
				key
			].reduce((acc, curr) => {
				acc += curr + '|';
				return acc;
			}, '')}" `;
		}
		if (key === 'Location' && advancedFilters[key].length >= 1) {
			string += `AND ${ref.Location} REGEXP "${advancedFilters[key].reduce(
				(acc, curr) => {
					acc += curr + '|';
					return acc;
				}
			)}" `;
		}
		if (key === 'Social Status' && advancedFilters[key].length >= 1) {
			advancedFilters[key].forEach(i => {
				if (i === 'ssUndetermined') {
					string += '';
				} else {
					const name = 'Is' + i.charAt(0).toUpperCase() + i.slice(1);
					string += `AND ${name} = 1 `;
				}
			});
		}
		if (key === 'Degree Holders' && advancedFilters[key].length >= 1) {
			string += `AND ${ref['Degree Holders']} REGEXP "${advancedFilters[
				key
			].reduce((acc, curr) => {
				acc += curr + '|';
				return acc;
			}, '')}" `;
		}
	}
	switch (sort) {
		case 'Name (A-Z)':
			string += `ORDER BY NameEnglish ASC`;
			break;
		case 'Name (Z-A)':
			string += `ORDER BY NameEnglish DESC`;
			break;
		case 'Location (A-Z)':
			string += `ORDER BY LocationEngl ASC`;
			break;
		case 'Location (Z-A)':
			string += `ORDER BY LocationEngl DESC`;
			break;
		case 'Reign (Old-New)':
			string += `ORDER BY ReignEnglish DESC`;
			break;
		case 'Reign (New-Old)':
			string += `ORDER BY ReignEnglish ASC`;
			break;
		default:
			string += ``;
	}
	connection.query(string, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(200).json({
				ok: false,
				result: [],
			});
		}
		res.status(200).json({
			ok: true,
			result,
		});
	});
	connection.end();
};

exports.getIndividualInfo = (req, res) => {
	const { id } = req.body;
	const connection = getNewConnectionObject();
	connection.query(`${str} WHERE people.PersonId="${id}"`, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(200).json({
				ok: false,
				result: [],
			});
		}
		res.status(200).json({
			ok: true,
			data: result[0],
		});
	});
	connection.end();
};
