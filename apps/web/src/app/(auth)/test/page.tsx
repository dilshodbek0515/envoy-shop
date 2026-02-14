'use client'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
const Api = 'https://dummyjson.com/auth/login'

type Data = {
  username: string
  password: string
}

const loginSchema = z.object({
  username: z.string().min(3, 'Username kamida 3ta harf bulsin'),
  password: z.string().min(8, 'Password kamida 8ta belgi bulsin')
})

const Test = () => {
  const loginSafeParse = (values: Data) => {
    const result = loginSchema.safeParse(values)

    if (result.success) {
      return {
        values: result.data,
        errors: {}
      }
    }

    // return {
    //   values: {},
    //   errors: Object.fromEntries(
    //     Object.entries(fieldErrors).map(([key, val]) => [
    //       key,
    //       {
    //         type: 'validation',
    //         message: val?.[0]
    //       }
    //     ])
    //   )
    // }

    const fieldError = result.error.flatten().fieldErrors

    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(fieldError).map(([key, val]) => [
          key,
          { type: 'validation', message: val?.[0] }
        ])
      )
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Data>({
    resolver: loginSafeParse,
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data: Data) => {
    const { password, username } = data
    try {
      const { data } = await axios.post(Api, { username, password })

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <div>
        <Controller
          name='username'
          control={control}
          render={({ field, fieldState }) => (
            <input
              type='text'
              value={field.value}
              placeholder='Username'
              onChange={field.onChange}
              style={{
                border: fieldState.invalid ? '1px solid red' : '1px solid gray'
              }}
            />
          )}
        />

        {errors.username && (
          <p style={{ color: 'red', fontSize: 7 }}>{errors.username.message}</p>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <input
              type='password'
              value={field.value}
              placeholder='Password'
              onChange={field.onChange}
              style={{
                border: fieldState.invalid ? '1px solid red' : '1px solid gray'
              }}
            />
          )}
        />
        {errors.password && (
          <p style={{ color: 'red', fontSize: 7 }}>{errors.password.message}</p>
        )}
      </div>
      <button type='submit'>Click</button>
    </form>
  )
}

export default Test
