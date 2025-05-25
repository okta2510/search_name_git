
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RepoState {
  username: string;
  selectedRepo: string | null;
}

const initialState: RepoState = {
  username: '',
  selectedRepo: null,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setSelectedRepo(state, action: PayloadAction<string | null>) {
      state.selectedRepo = action.payload;
    },
  },
});

export const { setUsername, setSelectedRepo } = repoSlice.actions;
export default repoSlice.reducer;
