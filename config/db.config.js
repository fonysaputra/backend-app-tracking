module.exports = {
	HOST: "mysql-60434-0.cloudclusters.net",
	USER: "admin",
	PASSWORD: "Dedekganteng20",
	DB: "app_tracking",
	dialect: "mysql",
	PORT: '10007',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: true,
	dialectOptions: {
		useUTC: false, //for reading from database
		dateStrings: true,
		typeCast: true
	},
	timezone: '+07:00'
};