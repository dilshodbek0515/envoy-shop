import MainInput from 'apps/web/src/shared/ui/input/MainInput/input'
import './product.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

const BASE_URL = 'http://envoyshop.webcoder.uz/product'

const Product_Api = '/product-detail/list-create/'
const Imges_Api = '/product/image-list-create/'
const Detail_Api = '/product/list-create/'

type ProductTypes = {
  product_name: string
  product_price: string
  product_category: string
  product_sub_category: string
  product_images: string
  product_sertificat_img: string
  product_minimum_amount: string
  product_minimum_criterion: string
  product_payment: string
  product_date: string
  product_expiration_date: string
  product_quality_class: string
  product_description: string
  product_delivery: string
}

const Product = () => {
  const { control, handleSubmit } = useForm<ProductTypes>({
    defaultValues: {
      product_name: '',
      product_price: '',
      product_category: '',
      product_sub_category: '',
      product_images: '',
      product_sertificat_img: '',
      product_minimum_amount: '',
      product_minimum_criterion: '',
      product_payment: '',
      product_date: '',
      product_expiration_date: '',
      product_quality_class: '',
      product_description: '',
      product_delivery: ''
    }
  })

  const onSubmit = async (data: ProductTypes) => {
    try {
      await axios.post('', data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='home_wrap'>
        <h2 style={{ fontSize: 40 }}>Mahsulot qo'shish</h2>

        <div className='add_form'>
          <div>
            <Controller
              name='product_name'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Mahsulot nomi'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_price'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Mahsulot narxi'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_category'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Kategoriya'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_sub_category'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Sub kategoriya'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_images'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Mahsulot rasmi'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_sertificat_img'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Mahsulot sertifikat rasmi'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_minimum_amount'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Eng kam miqdor'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_minimum_criterion'
              control={control}
              render={({ field }) => (
                <MainInput
                  label="O'lchov birligi"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_payment'
              control={control}
              render={({ field }) => (
                <MainInput
                  label="To'lov turi"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_date'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Ishlab chiqarish sanasi'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_expiration_date'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Yaroqlilik muddati'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_quality_class'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Sifat klassi'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_description'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Tavsif'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='product_delivery'
              control={control}
              render={({ field }) => (
                <MainInput
                  label='Yetkazib berish'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <button
          type='submit'
          style={{
            width: 150,
            height: 40,
            borderRadius: 10,
            cursor: 'pointer'
          }}
        >
          Qo'shish
        </button>
      </form>
    </div>
  )
}

export default Product
