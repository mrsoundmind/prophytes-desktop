export async function simulateUploadProgress(uploadFn, onProgress) {
  const checkpoints = [0, 30, 45, 60, 90]; // intermediate progress points

  for (let i = 0; i < checkpoints.length; i++) {
    await new Promise((res) => setTimeout(res, 400)); // small delay
    onProgress(checkpoints[i]);
  }

  // Call actual upload
  const result = await uploadFn();

  // Finish with 100%
  onProgress(100);

  return result;
}
