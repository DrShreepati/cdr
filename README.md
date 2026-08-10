# Community-Based Child Death Review (CB-CDR) Digital Suite

## Overview
This project is a complete digital translation of the official 2014 CB-CDR Operational Guidelines. It is designed to replace volatile paper-based data collection with a secure, offline-capable, and analytically structured web application for field deployment.

## Clinical & Administrative Objectives
* **Frictionless Adoption:** The user interface acts as a perfect mirror of the traditional paper forms to ensure immediate workflow integration by health Care Workers without requiring extensive retraining.
* **Burden Reduction:** Automates complex clinical calculations (e.g., calendar-based age, LMP/USG-derived gestational age, dynamic vital sign flagging) to significantly reduce the cognitive and administrative load on ASHA workers, ANMs, and Sector Medical Officers.
* **Data Liquidity:** Transforms static paperwork into structured clinical data. Features local database compilation and real-time CSV exports to identify regional mortality hotspots, track specific etiologies, and expose facility-level treatment delays.

## Current Architecture & Features
* **Smart Skip-Logic:** Automatically locks/unlocks appropriate autopsy forms based on calculated chronological age to prevent field-level data entry errors.
* **Rigid PDF Generation:** Contains a custom print stylesheet that strips digital UI elements and compresses the data back into the exact structural layout expected by auditors and District Nodal Officers.
* **Session Protection:** Real-time background saving logic to IndexedDB prevents accidental data loss from browser refreshes mid-autopsy.

## Roadmap 
* Implementation of a Service Worker for 100% offline deployment in remote blocks.
* Persistent Storage API integration to protect against OS-level cache purges.
* Secure, automated data synchronization pipelines.

**Clinical Lead & Architect:** Dr. Shreepati Panigrahy & Dr. Shruti Lagna Nayak
