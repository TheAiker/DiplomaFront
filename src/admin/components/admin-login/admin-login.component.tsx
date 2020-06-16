import { adminAuthService } from 'admin/services';
import { Button, TextField } from 'common/components';
import encodeSHA256 from 'crypto-js/sha256';
import React, { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import './admin-login.styles';

const prehashedPassword = '4c258c367b21594fa039da679c636fe3a6c1949c91173bd3750d1a36413cfbac';

export type TAdminLoginProps = {
    onSuccess: () => void;
};

export function AdminLogin(props: TAdminLoginProps): JSX.Element {
    const { onSuccess } = props;
    const [password, setPassword] = useState('');

    const onLoginFormSubmitHandler = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!password) {
            toast('Введите пароль', { type: 'warning' });
            return;
        }

        const hashedPassword = encodeSHA256(password).toString();

        if (hashedPassword === prehashedPassword) {
            adminAuthService.isAuthorized = true;
            onSuccess();
        } else {
            toast('Неверный пароль', { type: 'error' });
        }
    }, [onSuccess, password]);

    return (
        <div className="admin-login">
            <form className="admin-login__wrapper" onSubmit={onLoginFormSubmitHandler}>
                <div className="admin-login__title">Вход в панель администратора</div>

                <TextField
                    label="Пароль администратора"
                    name="adminPassword"
                    placeholder="*****"
                    onChange={setPassword}
                    type="password"
                />

                <Button>Войти</Button>
            </form>
        </div>
    );
}
