import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type InputField = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
};

type AuthCardProps = {
  title: string;
  description?: string;
  inputs: InputField[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footerNav?: string;
  footerText?: string;
  footerLink?: string;
  footer?: React.ReactNode;
  actionNav?: string;
  actionLabel?: string;
};

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  inputs,
  buttonText,
  onSubmit,
  footerNav,
  footerText,
  footerLink,
  footer,
  actionNav,
  actionLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <Card className="w-full max-w-sm bg-slate-800/90 text-indigo-300 border-none shadow-lg">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center">
              {title}
            </CardTitle>
            <CardDescription className="text-center text-indigo-300">
              {description}
            </CardDescription>
            {actionNav && actionLabel && (
              <CardAction
                className="text-blue-400 cursor-pointer underline"
                onClick={() => navigate(actionNav)}
              >
                {actionLabel}
              </CardAction>
            )}
          </CardHeader>

          <CardContent>
            {inputs.map((input, index) => (
              <div key={index} className="relative mt-5">
                {input.icon && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300">
                    {input.icon}
                  </span>
                )}
                <input
                  {...input}
                  className={`
                    w-full py-2 pl-10 pr-3 rounded-lg 
                    bg-[#333A5C] text-white placeholder-gray-400
                    border border-gray-700 focus:outline-none
                    focus:border-indigo-500 focus:ring-indigo-500
                    transition duration-200
                  `}
                />
              </div>
            ))}

            <Button
              className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-800 text-white transition-all duration-300 ease-in-out hover:brightness-110 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"

              type="submit"
            >
              {buttonText}
            </Button>
          </CardContent>

          <CardFooter className="mt-5 justify-center">
            {footer ? (
              footer
            ) : footerLink ? (
              <div className="text-xs text-gray-400 text-center">
                {footerText}{' '}
                <Link to={footerLink} className="text-blue-400 underline">
                  {footerNav ?? 'Home'}
                </Link>
              </div>
            ) : null}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default AuthCard;
