import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitDayPopoverProps {
    date: Date;
    onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
    possibleHabits: {
        id: string;
        title: string[];
        created_at: string[];
    }[],
    completedHabits: string[];
}

export function HabitDayPopover({ date, onCompletedChange }: HabitDayPopoverProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()


    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString()
            }
        }).then(response => setHabitsInfo(response.data))
    }, [])

    async function handleCheckHabit(habitId: string) {
        const isAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)
        await api.patch(`habits/${habitId}/toggle`)

        let completedHabits: string[] = [...habitsInfo!.completedHabits, habitId];

        isAlreadyCompleted
            ? completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
            : completedHabits = [...habitsInfo!.completedHabits, habitId]

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits
            , completedHabits
        });
        onCompletedChange(completedHabits.length)
    }

    return (
        <div className="mt-6 flex flex-col gap-3" >
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                        onCheckedChange={() => handleCheckHabit(habit.id)}
                        disabled={isDateInPast}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zim-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white" />
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through'>
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )

            })}

        </div>
    )
}