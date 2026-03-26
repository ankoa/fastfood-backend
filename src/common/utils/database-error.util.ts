import { QueryFailedError } from 'typeorm';

export enum DatabaseErrorType {
  UNIQUE_VIOLATION = 'UNIQUE_VIOLATION',
  FOREIGN_KEY_VIOLATION = 'FOREIGN_KEY_VIOLATION',
  UNKNOWN = 'UNKNOWN',
}

type DbError = QueryFailedError & {
  code?: string;
  detail?: string;
  driver?: {
    constructor?: {
      name?: string;
    };
  };
};

const ERROR_CODE_MAP = {
  PostgresDriver: {
    UNIQUE_VIOLATION: ['23505'],
    FOREIGN_KEY_VIOLATION: ['23503'],
  },
  MysqlDriver: {
    UNIQUE_VIOLATION: ['ER_DUP_ENTRY', '1062'],
  },
  SqliteDriver: {
    UNIQUE_VIOLATION: ['SQLITE_CONSTRAINT_UNIQUE'],
  },
} as const;

export class DatabaseErrorHandler {
  private static getDriver(err: DbError): string | undefined {
    return err.driver?.constructor?.name;
  }

  static getErrorType(error: QueryFailedError): DatabaseErrorType {
    const err = error as DbError;
    const driver = this.getDriver(err);
    const code = err.code;

    if (driver && code) {
      const driverMap = ERROR_CODE_MAP[driver as keyof typeof ERROR_CODE_MAP];

      if (driverMap) {
        if (
          driverMap.UNIQUE_VIOLATION &&
          (driverMap.UNIQUE_VIOLATION as readonly string[]).includes(code)
        ) {
          return DatabaseErrorType.UNIQUE_VIOLATION;
        }

        if (
          'FOREIGN_KEY_VIOLATION' in driverMap &&
          Array.isArray(driverMap.FOREIGN_KEY_VIOLATION) &&
          driverMap.FOREIGN_KEY_VIOLATION.includes(code)
        ) {
          return DatabaseErrorType.FOREIGN_KEY_VIOLATION;
        }
      }
    }

    // fallback
    if (
      err.message?.toLowerCase().includes('unique') ||
      err.detail?.toLowerCase().includes('already exists')
    ) {
      return DatabaseErrorType.UNIQUE_VIOLATION;
    }

    return DatabaseErrorType.UNKNOWN;
  }

  static getField(detail?: string): string | null {
    if (!detail) return null;
    const match = detail.match(/\((.*?)\)/);
    return match ? match[1] : null;
  }
}
