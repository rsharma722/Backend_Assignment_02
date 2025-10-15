import { Branch as FireBranch } from "../models/branchModel";
import {
createDocument,
getDocuments,
getDocumentById,
updateDocument,
deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

type BranchNoId = Omit<FireBranch, "id">;
export type FireNewBranch = Omit<FireBranch, "id" | "createdAt" | "updatedAt">;

const toStringId = (id: string | number) => String(id);

export const getAll = async (): Promise<FireBranch[]> => {
const snap = await getDocuments(COLLECTION);
return snap.docs.map((doc) => {
    const data = doc.data() as BranchNoId;
    return { id: doc.id, ...data };
});
};

export const getById = async (id: string | number): Promise<FireBranch | undefined> => {
const doc = await getDocumentById(COLLECTION, toStringId(id));
if (!doc) return undefined;
const data = doc.data() as BranchNoId;
return { id: doc.id, ...data };
};

export const create = async (data: FireNewBranch): Promise<FireBranch> => {
const now = new Date().toISOString();
const newId = await createDocument<BranchNoId>(COLLECTION, {
    ...data,
    createdAt: now,
    updatedAt: now,
});

const created = await getDocumentById(COLLECTION, newId);
if (created) {
    const payload = created.data() as BranchNoId;
    return { id: newId, ...payload };
}

return { id: newId, ...(data as BranchNoId), createdAt: now, updatedAt: now };
};

export const update = async (
id: string | number,
updates: Partial<FireNewBranch>
): Promise<FireBranch | null> => {
const docId = toStringId(id);
const existing = await getDocumentById(COLLECTION, docId);
if (!existing) return null;

await updateDocument<BranchNoId>(COLLECTION, docId, {
    ...updates,
    updatedAt: new Date().toISOString(),
});

const updated = await getDocumentById(COLLECTION, docId);
if (!updated) return null;
const payload = updated.data() as BranchNoId;
return { id: updated.id, ...payload };
};

export const remove = async (id: string | number): Promise<boolean> => {
const docId = toStringId(id);
const existing = await getDocumentById(COLLECTION, docId);
if (!existing) return false;

await deleteDocument(COLLECTION, docId);
return true;
};
