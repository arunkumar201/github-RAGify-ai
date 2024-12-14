export const prismaErrorMap: {
	[category: string]: {
		[code: string]: string;
	};
} = {
	PrismaClientInitializationError: {
		P1000:
			"Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid.",
		P1001:
			"Can't reach database server at {database_host}:{database_port}. Please make sure your database server is running at {database_host}:{database_port}.",
		P1002:
			"The database server at {database_host}:{database_port} was reached but timed out.",
		P1003:
			"Database {database_file_name} does not exist at {database_file_path} or {database_name}.{database_schema_name} does not exist at {database_host}:{database_port}.",
		P1008: "Operations timed out after {time}",
		P1009:
			"Database {database_name} already exists at {database_host}:{database_port}",
		P1010:
			"User {database_user} was denied access on the database {database_name}",
		P1011: "Error opening a TLS connection: {message}",
		P1012: "Error parsing schema: {full_error}",
		P1013: "The provided database string is invalid. {details}",
	},
	PrismaClientValidationError: {
		message: "Validation failed. Example: Missing field or invalid field type.",
		clientVersion: "2.19.0",
	},
	PrismaErrorCodes: {
		P2000:
			"The provided value for the column is too long for the column's type. Column: {column_name}",
		P2001:
			"The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist.",
		P2002: "Unique constraint failed on the {constraint}",
		P2003: "Foreign key constraint failed on the field: {field_name}",
		P2004: "A constraint failed on the database: {database_error}",
		P2005:
			"The value {field_value} stored in the database for the field {field_name} is invalid for the field's type",
		P2006:
			"The provided value {field_value} for {model_name} field {field_name} is not valid",
		P2007: "Data validation error {database_error}",
		P2008:
			"Failed to parse the query {query_parsing_error} at {query_position}",
		P2009:
			"Failed to validate the query: {query_validation_error} at {query_position}",
		P2010: "Raw query failed. Code: {code}. Message: {message}",
		P2011: "Null constraint violation on the {constraint}",
		P2012: "Missing a required value at {path}",
		P2013:
			"Missing the required argument {argument_name} for field {field_name} on {object_name}.",
		P2014:
			"The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models.",
		P2015: "A related record could not be found. {details}",
		P2016: "Query interpretation error. {details}",
		P2017:
			"The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.",
		P2018: "The required connected records were not found. {details}",
		P2019: "Input error. {details}",
		P2020: "Value out of range for the type. {details}",
		P2021: "The table {table} does not exist in the current database.",
		P2022: "The column {column} does not exist in the current database.",
		P2023: "Inconsistent column data: {message}",
		P2024: "Timed out fetching a new connection from the connection pool.",
		P2025:
			"An operation failed because it depends on one or more records that were required but not found. {cause}",
		P2026:
			"The current database provider doesn't support a feature that the query used: {feature}",
		P2027:
			"Multiple errors occurred on the database during query execution: {errors}",
		P2028: "Transaction API error: {error}",
		P2029: "Query parameter limit exceeded error: {message}",
		P2030:
			"Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema",
		P2031:
			"Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.",
		P2033:
			"A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type.",
		P2034:
			"Transaction failed due to a write conflict or a deadlock. Please retry your transaction",
		P2035: "Assertion violation on the database: {database_error}",
		P2036: "Error in external connector (id {id})",
		P2037: "Too many database connections opened: {message}",
	},
	PrismaMigrateErrors: {
		P3000: "Failed to create database: {database_error}",
		P3001:
			"Migration possible with destructive changes and possible data loss: {migration_engine_destructive_details}",
		P3002: "The attempted migration was rolled back: {database_error}",
		P3003:
			"The format of migrations changed, the saved migrations are no longer valid.",
		P3004:
			"The {database_name} database is a system database, it should not be altered with prisma migrate.",
		P3005: "The database schema is not empty.",
		P3006:
			"Migration {migration_name} failed to apply cleanly to the shadow database.",
		P3007:
			"Some of the requested preview features are not yet allowed in schema engine.",
		P3008:
			"The migration {migration_name} is already recorded as applied in the database.",
		P3009: "Migrate found failed migrations in the target database.",
		P3010:
			"The name of the migration is too long. It must not be longer than 200 characters.",
		P3011:
			"Migration {migration_name} cannot be rolled back because it was never applied to the database.",
		P3012:
			"Migration {migration_name} cannot be rolled back because it is not in a failed state.",
		P3013: "Datasource provider arrays are no longer supported in migrate.",
		P3014:
			"Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases.",
		P3015: "Could not find the migration file at {migration_file_path}.",
		P3016: "The fallback method for database resets failed.",
		P3017: "The migration {migration_name} could not be found.",
		P3018:
			"A migration failed to apply. New migrations cannot be applied before the error is recovered from.",
		P3019:
			"The datasource provider {provider} specified in your schema does not match the one specified in the migration_lock.toml.",
		P3020:
			"The automatic creation of shadow databases is disabled on Azure SQL.",
		P3021: "Foreign keys cannot be created on this database.",
		P3022:
			"Direct execution of DDL SQL statements is disabled on this database.",
	},
	PrismaAccelerateErrors: {
		P6000: "Generic error to catch all other errors.",
		P6001:
			"The URL is malformed; for instance, it does not use the prisma:// protocol.",
		P6002: "The API Key in the connection string is invalid.",
		P6003: "The included usage of the current plan has been exceeded.",
		P6004: "The global timeout of Accelerate has been exceeded.",
		P6005: "The user supplied invalid parameters.",
		P6006: "The chosen Prisma version is not compatible with Accelerate.",
		P6008:
			"The engine failed to start. For example, it couldn't establish a connection to the database.",
		P6009: "The global response size limit of Accelerate has been exceeded.",
		P6010: "Your accelerate project is disabled.",
		P5011:
			"Too many requests. Implement a back-off strategy and try again later.",
	},
	PrismaPulseErrors: {
		P6100: "An unexpected server error occurred. HTTP Status 500.",
		P6101: "Datasource is not reachable by Prisma Pulse.",
		P6102: "The API key is invalid.",
		P6103: "Prisma Pulse is not enabled for the configured API key.",
		P6104: "Your Prisma Data Platform account has been blocked.",
		P6105:
			"The Prisma version of the project is not compatible with Prisma Pulse.",
	},
};
