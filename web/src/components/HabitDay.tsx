import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';
import { HabitDayPopover } from './HabitDayPopover';
import { useState } from "react";

interface HabitProps {
    date: Date;
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({ date, defaultCompleted = 0, amount = 0 }: HabitProps) {
    const [completed, setCompleted] = useState(defaultCompleted);
    const percent = amount > 0 ? Math.round((completed / amount) * 100) : 0;
    //console.log(`completed: ${completed}; amount: ${amount}; percent: ${percent}`);
    const dayAndMonth = dayjs(date).format('DD/MM/YYYY')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleCompletedChange(newCompletedValue: number) {
        setCompleted(newCompletedValue);
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",
                    {
                        "bg-zinc-900 border-zinc-800": percent === 0,
                        "bg-violet-900 border-violet-800": percent > 0 && percent < 20,
                        "bg-violet-800 border-violet-700": percent >= 20 && percent < 40,
                        "bg-violet-700 border-violet-600": percent >= 40 && percent < 60,
                        "bg-violet-600 border-violet-500": percent >= 60 && percent < 80,
                        "bg-violet-500 border-violet-400": percent >= 80
                    })}
            />
            <Popover.Portal>
                <Popover.Content
                    className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span
                        className='font-semibold text-zinc-400'
                    >
                        {dayOfWeek}
                    </span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>
                        {dayAndMonth}
                    </span>
                    <ProgressBar progress={percent}></ProgressBar>

                    <HabitDayPopover
                        date={date}
                        onCompletedChange={handleCompletedChange} />
                    <Popover.Arrow
                        height={8}
                        width={16}
                        className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}