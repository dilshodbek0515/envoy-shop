"use client";
import "./register.css";
import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller, Resolver } from "react-hook-form";
import Button from "apps/web/src/shared/ui/button/button";
import { registerSchema, RegisterFormData } from "apps/schema/schema";
import InputPhone from "apps/web/src/shared/ui/input/InputPhone/InputPhone";
import { RegisterFn } from "../../../../../../../packages/api/register/register";
import { getClientIp, getDeviceName } from "../../../../utils/device";

const Register: FC = () => {
  const router = useRouter();
  const device_name = getDeviceName();

  const safeResolver: Resolver<RegisterFormData> = async (values) => {
    const result = registerSchema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors = result.error.flatten().fieldErrors;

    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [
          k,
          { type: "validation", message: v?.[0] },
        ]),
      ),
    };
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: safeResolver,
    mode: "onChange",
    defaultValues: { phone: "" },
  });

  const registerMutation = useMutation({
    mutationFn: RegisterFn,
    onSuccess: (res, data) => {
      if (res.message === 'Verification code sent') {
        localStorage.setItem('register_phone', data.phone)
        localStorage.setItem('expires_in', String(res.expires_in))
        localStorage.setItem('expires_saved_at', String(Date.now()))
        localStorage.setItem('register_payload', JSON.stringify(data))

        router.replace('/register/register-sms')
      } else {
        reset()
      }
    },

    onError: err => {
      console.log('OTP send error:', err)
      reset()
    }
  })

  const onSubmit = async (form: RegisterFormData) => {
    const ip = await getClientIp()
    const fullPhone = '+998' + form.phone

    const payload = {
      phone: fullPhone,
      ip_address: ip,
      device_id: device_name,
      purpose: 'verify_phone'
    }
    registerMutation.mutate(payload)
  }

  return (
    <div className="container">
      <div className="register_box">
        <h2 className="login_title">Ro'yxatdan o'tish</h2>

        <form className='default_form' onSubmit={handleSubmit(onSubmit)}>
          <div className='input_group'>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <InputPhone
                  label="Telefon raqam"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
              )}
            />
            {errors.phone && (
              <div className="error_text">{errors.phone.message}</div>
            )}
          </div>

          <Button
            label='Davom etish'
            type='submit'
            disabled={!isValid}
            loading={registerMutation.isPending}
          />
        </form>

        <div className="route_bottom">
          <Link href="/login" className="route_button_style">
            <span className="acc">Akkountingiz bormi? </span> Kirish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
