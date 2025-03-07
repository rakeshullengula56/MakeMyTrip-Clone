import React from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';

import { Input } from './ui/input';
import { signup ,login} from '@/api';
import { setUser } from '@/store';
import { useDispatch } from 'react-redux';

const SignupDialog = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignup) {
          try {
            const signin = await signup(
              firstName,
              lastName,
              email,
              phoneNumber,
              password
            );
            dispatch(setUser(signin));
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const data = await login(email, password);
            dispatch(setUser(data));
            setOpen(false);
            clearForm();
          } catch (error) {
            console.log(error);
          }
        }
      };
    const clearForm=()=>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    }
    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-white text-black hover:bg-gray-200">Signup</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white rounded-lg p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {isSignup ? "Create Account" : "Welcome Back"}
                        </DialogTitle>
                        <DialogDescription>
                            {isSignup ? "Sign up to start booking your travels" : "Please enter your details to login"}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAuth} className="space-y-4 py-4">
                        {isSignup && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName">First Name:</label>
                                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label htmlFor="email">Email:</label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password:</label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {isSignup && (
                            <div className="space-y-2">
                                <label htmlFor="phoneNumber">Phone Number:</label>
                                <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                            </div>
                        )}
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            {isSignup ? "Signup" : "Login"}
                        </Button>
                    </form>
                    <div className="text-center text-sm">
                        {isSignup ? (
                            <>
                                Already have an account?{" "}
                                <Button className="p-0 text-blue-600" variant="link" onClick={() => setIsSignup(false)}>
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <Button className="p-0 text-blue-600" variant="link" onClick={() => setIsSignup(true)}>
                                    Signup
                                </Button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
    );
};

export default SignupDialog;
