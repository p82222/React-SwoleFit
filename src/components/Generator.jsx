import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { WORKOUTS, SCHEMES } from '../utils/swoldier';
import Button from './Button';

function Header({ index, title, description }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
                <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">{index}</p>
                <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
            </div>
            <p className="text-sm sm:text-base mx-auto">{description}</p>
        </div>
    );
}

export default function Generator({ poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout }) {
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !== muscleGroup));
            return;
        }

        if (muscles.length >= 3) {
            return;
        }

        if (poison !== 'individual') {
            setMuscles([muscleGroup]);
            setShowModal(false);
            return;
        }

        setMuscles([...muscles, muscleGroup]);

        if (muscles.length === 2) {
            setShowModal(false);
        }
    }

    return (
        <SectionWrapper id = {'generate'} header="generate your workout" title={["It's", "Huge", "o'clock"]}>
            <Header index="01" title="Pick your poison" description="Select your workout" />
            <div className="grid grid-col-2 sm:grid-cols-4 gap-4">
                {Object.keys(WORKOUTS).map((type, typeIndex) => (
                    <button
                        onClick={() => setPoison(type)}
                        key={typeIndex}
                        className={`bg-slate-950 border border-blue-200 px-4 duration-600 hover:border-blue-600 py-3 rounded-lg 
                        ${type === poison ? 'border-blue-400' : 'border-blue-600'}`}
                    >
                        <p className="capitalize">{type.replaceAll('_', ' ')}</p>
                    </button>
                ))}
            </div>

            <Header index="02" title="Lock on targets" description="Select the muscles judged for annihilation." />
            <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
                <button onClick={toggleModal} className="relative flex p-3 items-center justify-center">
                    <p>
                        {muscles.length > 0 ? muscles.map(m => m.toUpperCase()).join(', ') : 'SELECT MUSCLE GROUP'}
                    </p>
                    <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
                </button>
                {showModal && (
                    <div className="flex flex-col px-3 pb-3">
                        {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map(
                            (muscleGroup, muscleGroupIndex) => (
                                <button
                                    onClick={() => updateMuscles(muscleGroup)}
                                    key={muscleGroupIndex}
                                    className={`hover:text-blue-400 duration-200 ${
                                        muscles.includes(muscleGroup) ? 'text-blue-400' : ''
                                    }`}
                                >
                                    <p className="uppercase">{muscleGroup.replaceAll('_', ' ')}</p>
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            <Header index="03" title="Train like a warrior" description="Select your ultimate objective." />
            <div className="grid grid-col-1 sm:grid-col-3 sm:grid-cols-3 gap-4">
                {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
                    <button
                        onClick={() => setGoal(scheme)}
                        key={schemeIndex}
                        className={`bg-slate-950 border border-blue-400 duration-600 hover:border-blue-600 py-3 rounded-lg px-4 
                        ${scheme === goal ? 'border-blue-400' : 'border-blue-600'}`}
                    >
                        <p className="capitalize">{scheme.replaceAll('_', ' ')}</p>
                    </button>
                ))}
            </div>

            <Button func={updateWorkout} text="Formulate" />
        </SectionWrapper>
    );
}
