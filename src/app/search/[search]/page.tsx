"use client";
import { useEffect } from "react";
import Dashboard from "~/app/_components/dashboard";
import Home from "~/app/page";

export default function Page({
    params,
}: {
    params: {
        search: string;
    }
}) {

    return(
        <Dashboard defaultSearch={params.search}/>
    )
}