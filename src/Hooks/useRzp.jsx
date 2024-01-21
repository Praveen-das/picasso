import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { _verifyPayment } from "../Services/rzp.api";

function useRzp() {
    const queryClient = useQueryClient()
    
    const verifyPayment = useMutation(_verifyPayment, {
        onSuccess: () => {
            queryClient.invalidateQueries(["currentUser"]);
        },
    });

    return {
        verifyPayment,
    };
}

export default useRzp;
