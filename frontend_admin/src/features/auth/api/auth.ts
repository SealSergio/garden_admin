import { validateResponse } from '../../../app/validateResponse';
import { Admin, AdminSchema } from '../../../entities/admin/model/Admin';

export function login(login: string, password: string): Promise<void> {
    return fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password}),
    })
    .then(validateResponse)
    .then(() => undefined);
}

export function logout(): Promise<void> {
    return fetch("api/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: null,
    })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<Admin> {
    return fetch("/api/auth/me")
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => AdminSchema.parse(data));
}
