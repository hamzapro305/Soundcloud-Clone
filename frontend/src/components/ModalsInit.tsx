"use client"
import { useAppSelector } from '@/Redux/Hooks'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import LoginModal from './Modals/LoginModal'

const ModalsInit = () => {
    const {
        loginModal
    } = useAppSelector(s => s.GlobalVariable)
    return (
        <AnimatePresence>
            {loginModal && <LoginModal />}
        </AnimatePresence>
    )
}

export default ModalsInit