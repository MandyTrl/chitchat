"use client"
import React, { useContext, useState } from "react"
import clsx from "clsx"
import { IoArrowForwardSharp } from "react-icons/io5"
import { UserContext } from "@/context/index"
import Link from "next/link"

export const Input = () => {
	const userCtxt = useContext(UserContext)

	const [value, setValue] = useState<string>("")
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const hasCorrectValue = value.length >= 5

	const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value.replace(/\s/g, ""))
		userCtxt.setUsername(e.target.value)
		setIsFocused(true)
	}

	return (
		<form>
			<label className="flex flex-col items-center justify-center">
				What&apos;s your name ?
				<div
					className={clsx(
						isFocused && hasCorrectValue
							? "border-green-500"
							: isFocused
							? "border-amber-400 shadow-inner"
							: "border-transparent",
						"flex items-center rounded-full mt-2 px-[6px] py-1 bg-amber-100/60 border"
					)}
					onClick={() => setIsFocused(true)}
					onMouseLeave={() => setIsFocused(false)}>
					<input
						name="pseudo"
						value={value}
						placeholder="Choose a pseudo"
						type="text"
						required
						minLength={5}
						onClick={() => setIsFocused(true)}
						onMouseLeave={() => setIsFocused(false)}
						onChange={(e) => handleFocus(e)}
						className="group px-2 py-1 bg-transparent focus:outline-0"
					/>

					<Link href={hasCorrectValue ? "/discussions" : ""}>
						<IoArrowForwardSharp
							className={clsx(
								hasCorrectValue
									? "bg-white text-green-500"
									: "bg-white/80 text-amber-400",
								"rounded-full p-1 text-3xl"
							)}
						/>
					</Link>
				</div>
			</label>
		</form>
	)
}
