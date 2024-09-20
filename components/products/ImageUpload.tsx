"use client"
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

export default function ImageUpload({image} : {image: string | undefined}) {   // Puede ser string o undefined

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => { //   mm Para que se ejecute cuando suba la imagen ts-ignore, esto no es un comentario eslint-disable-next-line @typescript-eslint/ban-ts-comment
                if(result.event === 'success') {
                    widget.close()
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset='utgx56zx'
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    <div className='space-y-2'>
                        <label className='text-slate-800'>Imagen Producto</label>
                        <div
                            className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 '
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className='text-lg font-semibold'>Agregar Imagen</p>

                            {imageUrl && (
                                <div
                                    className='absolute inset-0 w-full h-full'
                                >
                                    <Image
                                        fill
                                        style={{objectFit: 'contain'}}
                                        src={imageUrl}
                                        alt='Imagen de Producto'
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className='space-y-2'>
                            <label>Imagen Actual:</label>
                            <div className='relative w-64 h-64'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen Producto"
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type='hidden'
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image }
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
