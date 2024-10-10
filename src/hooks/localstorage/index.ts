// src/hooks/usePersistedState.ts
import { selectedBranchState, selectedDcState } from '@/utils/recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const usePersistedBranchState = () => {
  const [selectedBranch, setSelectedBranch] =
    useRecoilState(selectedBranchState);

  useEffect(() => {
    // Load the initial state from localStorage if available
    const storedBranch = localStorage.getItem('selectedBranch');
    if (storedBranch) {
      setSelectedBranch(storedBranch);
    }
  }, [setSelectedBranch]);

  useEffect(() => {
    if (selectedBranch !== null && selectedBranch !== undefined) {
      localStorage.setItem('selectedBranch', selectedBranch);
    } else {
      localStorage.removeItem('selectedBranch');
    }
  }, [selectedBranch]);

  return [selectedBranch, setSelectedBranch] as const;
};

export const usePersistedDCState = () => {
  const [selectedDc, setSelectedDc] = useRecoilState(selectedDcState);

  // Load the persisted state from localStorage when the component mounts
  useEffect(() => {
    const storedDc = localStorage.getItem('selectedDC');
    if (storedDc) {
      setSelectedDc(storedDc);
    }
  }, [setSelectedDc]);

  // Persist the selected DC state to localStorage whenever it changes
  useEffect(() => {
    if (selectedDc !== null && selectedDc !== undefined) {
      localStorage.setItem('selectedDC', selectedDc);
    } else {
      localStorage.removeItem('selectedDC'); // Clear localStorage if the state is null or undefined
    }
  }, [selectedDc]);

  return [selectedDc, setSelectedDc] as const;
};
