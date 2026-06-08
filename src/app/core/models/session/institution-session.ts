import { SessionKeys } from '../../../shared/constants/cache-keys';

export class InstitutionSession {
    get id(): string | null {
        return sessionStorage.getItem(SessionKeys.INSTITUTION_ID);
    }

    get slug(): string | null {
        return sessionStorage.getItem(SessionKeys.INSTITUTION_SLUG);
    }

    get shortName(): string | null {
        return sessionStorage.getItem(SessionKeys.INSTITUTION_SHORT_NAME);
    }
}