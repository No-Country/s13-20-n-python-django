import React from 'react'
import background from '../../assets/kanban.jpg'

function Form() {
    return (
        <div className="flex w-full">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className=' w-11/12 max-w-[700px] px-8 py-6 rounded-3xl border-0 border-gray-100'>
                    <h1 className='text-3xl font-semibold'>Welcome Back!</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'>Please enter you details.</p>
                    <div className='mt-6'>
                        <div className='flex flex-col'>
                            <label className='font-medium'>Email</label>
                            <input
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                                placeholder="Enter your email" />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='font-medium'>Password</label>
                            <input
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                                placeholder="Enter your email"
                                type={"password"}
                            />
                        </div>
                        <div className='mt-6 flex justify-center items-center'>
                            <button className='font-medium text-base text-violet-500'>Forgot password</button>
                        </div>
                        <div className='mt-6 flex flex-col gap-y-4'>
                            <button
                                // onClick={handleLogin}
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign in</button>
                        </div>
                        <div className='mt-6 flex justify-center items-center'>
                            <p className='font-medium text-base'>Don't have an account?</p>
                            <button
                                // onClick={() => setAuthState('register')}
                                className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden relative w-1/2 lg:flex items-center justify-center">
                <div className="hero h-full" style={{ backgroundImage: `url(${background})` }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl text-white font-bold">Welcome to Tabula!</h1>
                            <p className="mb-5 text-white">Organize your projects with ease, collaborate seamlessly, and boost your productivity with our intuitive project management tool inspired by Trello. Whether you're a solo entrepreneur, a small team, or a large organization, Tabula is here to simplify your workflow.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form