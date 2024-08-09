// src/hooks/usePersistedState.ts
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedBranchState, selectedDcState } from '../branch/branch';

export const usePersistedBranchState = () => {
  const [selectedBranch, setSelectedBranch] = useRecoilState(selectedBranchState);

  useEffect(() => {
    // Load the initial state from localStorage if available
    const storedBranch = localStorage.getItem('selectedBranch');
    if (storedBranch) {
      setSelectedBranch(storedBranch);
    }
  }, [setSelectedBranch]);

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    if (selectedBranch !== null) {
      localStorage.setItem('selectedBranch', selectedBranch);
    }
  }, [selectedBranch]);

  return [selectedBranch, setSelectedBranch] as const;
};

export const usePersistedDCState = () => {
    const [selectedDc, setSelectedDc] = useRecoilState(selectedDcState);
  
    useEffect(() => {
      // Load the initial state from localStorage if available
      const storedBranch = localStorage.getItem('selectedDC');
      if (storedBranch) {
        setSelectedDc(storedBranch);
      }
    }, [setSelectedDc]);
  
    useEffect(() => {
      // Save the state to localStorage whenever it changes
      if (selectedDc !== null) {
        localStorage.setItem('selectedDC', selectedDc);
      }
    }, [selectedDc]);
    return [selectedDc, setSelectedDc] as const;
};
  