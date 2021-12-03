module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "123",
	DB: "app_tracking",
	dialect: "mysql",
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