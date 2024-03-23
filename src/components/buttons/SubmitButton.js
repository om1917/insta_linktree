import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, className = '' }) {
    const { pending } = useFormStatus();
    return (
        <button
            type='submit'
            disabled={pending}
            className={'flex gap-2 justify-center items-center w-full bg-blue-500 text-white py-1.5 px-2 rounded  mx-auto mt-1 disabled:bg-blue-400' + className}
        >
            {pending && (
                <span>
                    Saving...
                </span>
            )}
            {!pending && (
                <span>
                    {children}
                </span>
            )}

        </button>
    )
}

