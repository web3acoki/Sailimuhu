export type PackageTier = "basic" | "pro" | "premium";

export type PickPhoto = {
  id: string;
  url: string;
  album?: string;
};

export type PickDraft = {
  packageTier: PackageTier;
  quota: number;
  selectedPhotoIds: string[];
  photos: PickPhoto[];
  submittedAt?: string;
};

function getQuotaByTier(tier: PackageTier) {
  if (tier === "basic") return 10;
  if (tier === "pro") return 15;
  return 25;
}

function getDefaultTier(orderId: string): PackageTier {
  const lastDigit = Number(orderId.slice(-1));
  if (!Number.isFinite(lastDigit)) return "pro";
  if (lastDigit <= 3) return "basic";
  if (lastDigit <= 6) return "pro";
  return "premium";
}

function buildMockPhotos(orderId: string): PickPhoto[] {
  const albums = ["环湖公路", "湖边草甸", "雪山远景", "日落蓝调"];
  const count = 36;
  return Array.from({ length: count }).map((_, idx) => {
    const id = String(idx + 1).padStart(3, "0");
    const seed = `${orderId}-${id}`;
    return {
      id,
      url: `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/1200`,
      album: albums[idx % albums.length],
    };
  });
}

function draftKey(orderId: string) {
  return `pick:draft:${orderId}`;
}

export function loadPickDraft(orderId: string): PickDraft {
  const raw = sessionStorage.getItem(draftKey(orderId));
  if (raw) {
    try {
      return JSON.parse(raw) as PickDraft;
    } catch {
      // ignore and rebuild
    }
  }

  const tier = getDefaultTier(orderId);
  const quota = getQuotaByTier(tier);

  const draft: PickDraft = {
    packageTier: tier,
    quota,
    selectedPhotoIds: [],
    photos: buildMockPhotos(orderId),
  };

  sessionStorage.setItem(draftKey(orderId), JSON.stringify(draft));
  return draft;
}

export function savePickDraft(orderId: string, draft: PickDraft) {
  sessionStorage.setItem(draftKey(orderId), JSON.stringify(draft));
}

export function togglePickPhoto(orderId: string, photoId: string) {
  const draft = loadPickDraft(orderId);
  const selected = new Set(draft.selectedPhotoIds);

  if (selected.has(photoId)) {
    selected.delete(photoId);
  } else {
    if (selected.size >= draft.quota) {
      return { ok: false as const, reason: "quota_reached" as const, draft };
    }
    selected.add(photoId);
  }

  const next = { ...draft, selectedPhotoIds: Array.from(selected) };
  savePickDraft(orderId, next);
  return { ok: true as const, draft: next };
}

export function removePickedPhotos(orderId: string, photoIds: string[]) {
  const draft = loadPickDraft(orderId);
  const toRemove = new Set(photoIds);
  const next = {
    ...draft,
    selectedPhotoIds: draft.selectedPhotoIds.filter((id) => !toRemove.has(id)),
  };
  savePickDraft(orderId, next);
  return next;
}

export function submitPick(orderId: string) {
  const draft = loadPickDraft(orderId);
  const next: PickDraft = { ...draft, submittedAt: new Date().toISOString() };
  savePickDraft(orderId, next);
  return next;
}

