"use client";

import { motion, MotionProps } from "framer-motion";

type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

export const MotionDiv = motion.div;
