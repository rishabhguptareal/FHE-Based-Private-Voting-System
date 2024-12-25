import { groth16 } from 'snarkjs';

// Initialize WebAssembly circuit
export async function initializeCircuit() {
  try {
    // In browser environment, we'll fetch pre-compiled circuit files
    const response = await fetch('/ageCheck_js/ageCheck.wasm');
    if (!response.ok) {
      throw new Error('Failed to load circuit WASM');
    }
    return true;
  } catch (error) {
    console.error('Circuit initialization failed:', error);
    return false;
  }
}

export async function generateProof(age) {
  try {
    const input = {
      age: parseInt(age),
      minAge: 18
    };
    
    // Generate the proof using pre-compiled circuit
    const { proof, publicSignals } = await groth16.fullProve(
      input,
      "/ageCheck_js/ageCheck.wasm",
      "/circuit_final.zkey"
    );
    
    // Verify the proof
    const vKeyResponse = await fetch('/verification_key.json');
    const vKey = await vKeyResponse.json();
    const verified = await groth16.verify(vKey, publicSignals, proof);
    
    return {
      success: true,
      verified,
      isOldEnough: publicSignals[0] === "1"
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}