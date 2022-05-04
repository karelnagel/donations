import Link from "next/link";
import React from "react";

export default function Button({
  href,
  onClick,
  children,
  secondary,
  text,
  newTab,
  big,
  submit,
  className,
}: {
  secondary?: boolean;
  text?: boolean;
  big?: boolean;
  submit?: boolean;
  newTab?: boolean;
  href?: string;
  onClick?: any;
  children: any;
  className?: string;
}) {
  let classes =
    "rounded-xl text-md py-2 px-6  hover:scale-105 duration-200 bg-cover shadow-md  uppercase font-bold flex items-center space-x-4 justify-center ";
  if (secondary) classes += "border-2 border-primary ";
  else if (text) classes += "";
  else classes += "bg-gradient-to-tr from-primary to-primaryDark hover:bg-project ";

  if (big) classes += "text-lg py-3";
  if (className) classes += className;

  if (newTab && href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button onClick={onClick} className={classes}>
          {children}
        </button>
      </a>
    );
  if (href)
    return (
      <Link href={href} passHref>
        <button className={classes}>{children}</button>
      </Link>
    );
  return (
    <button onClick={onClick} className={classes} type={submit ? "submit" : undefined}>
      {children}
    </button>
  );
}
