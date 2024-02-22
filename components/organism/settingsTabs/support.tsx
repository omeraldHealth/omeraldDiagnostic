import { ContactForm } from "@components/molecules/form/contact-form";
import { useState } from "react";
import { useAuthContext } from "utils/context/auth.context";

export function Support() {
	return (
        <section>
            <ContactForm/>
        </section>
    )
}

