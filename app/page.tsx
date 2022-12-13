"use client";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import DiagnosisForm from "../components/diagnosis-form";
import classNames from "../utils/classnames";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-indigo-100 flex sm:px-0 px-3 justify-center flex-col items-center">
      <Toaster />
      <h1 className="text-4xl font-bold mb-8">
        Final Project Analitika Bisnis
      </h1>
      <Tab.Group>
        <Tab.List className="bg-white pt-1 flex justify-center rounded shadow mb-2 w-full sm:w-1/2">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  selected
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent hover:border-gray-300 hover:text-gray-600",
                  "inline-block rounded-t-lg border-b-2 p-4 focus:outline-none"
                )}
              >
                Pneumonia
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  selected
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent hover:border-gray-300 hover:text-gray-600",
                  "inline-block rounded-t-lg border-b-2 p-4 focus:outline-none"
                )}
              >
                TBC
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel className="w-full flex justify-center">
            <DiagnosisForm type="pneumonia" />
          </Tab.Panel>
          <Tab.Panel className="w-full flex justify-center">
            <DiagnosisForm type="tbc" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}
