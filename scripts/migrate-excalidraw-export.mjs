/**
 * Normalizes MCP-exported .excalidraw JSON to the native Excalidraw schema
 * so files open in excalidraw.com / desktop (same shape as saves from the app).
 *
 * Usage: node scripts/migrate-excalidraw-export.mjs <input.excalidraw> [output.excalidraw]
 */

import fs from "fs";
import { generateKeyBetween } from "fractional-indexing";

const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath;

if (!inputPath) {
  console.error("Usage: node scripts/migrate-excalidraw-export.mjs <input> [output]");
  process.exit(1);
}

function randInt() {
  return Math.floor(Math.random() * 2 ** 31);
}

function bboxFromPoints(points) {
  let minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0;
  for (const [px, py] of points) {
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  }
  return { width: maxX - minX, height: maxY - minY };
}

function baseDefaults() {
  const t = Date.now();
  return {
    angle: 0,
    fillStyle: "solid",
    strokeStyle: "solid",
    opacity: 100,
    groupIds: [],
    frameId: null,
    seed: randInt(),
    version: 1,
    versionNonce: randInt(),
    isDeleted: false,
    boundElements: null,
    updated: t,
    link: null,
    locked: false,
  };
}

function migrateText(el) {
  const d = baseDefaults();
  return {
    ...d,
    boundElements: el.boundElements ?? [],
    id: el.id,
    type: "text",
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    strokeColor: el.strokeColor ?? "#1e1e1e",
    backgroundColor: el.backgroundColor ?? "transparent",
    strokeWidth: el.strokeWidth ?? 1,
    roughness: el.roughness ?? 1,
    roundness: null,
    text: el.text ?? "",
    fontSize: el.fontSize ?? 16,
    fontFamily: el.fontFamily ?? 1,
    textAlign: el.textAlign ?? "left",
    verticalAlign: el.verticalAlign ?? "top",
    containerId: el.containerId ?? null,
    originalText: el.originalText ?? el.text ?? "",
    autoResize: el.autoResize ?? true,
    lineHeight: el.lineHeight ?? 1.25,
  };
}

function migrateRectangle(el) {
  const d = baseDefaults();
  const hasLabel = el.label && typeof el.label.text === "string";
  const boundElements = hasLabel ? [{ type: "text", id: `${el.id}_label` }] : [];

  const rect = {
    ...d,
    boundElements,
    id: el.id,
    type: "rectangle",
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    strokeColor: el.strokeColor ?? "#1e1e1e",
    backgroundColor: el.backgroundColor ?? "transparent",
    strokeWidth: el.strokeWidth ?? 1,
    roughness: el.roughness ?? 1,
    roundness: el.roundness ?? { type: 3 },
  };

  const out = [rect];
  if (hasLabel) {
    const fsz = el.fontSize ?? 16;
    const labelText = el.label.text;
    out.push(
      migrateText({
        id: `${el.id}_label`,
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height,
        strokeColor: el.strokeColor ?? "#1e1e1e",
        text: labelText,
        fontSize: fsz,
        fontFamily: el.fontFamily ?? 1,
        textAlign: "center",
        verticalAlign: "middle",
        containerId: el.id,
        originalText: labelText,
      })
    );
  }
  return out;
}

function migrateEllipse(el) {
  const d = baseDefaults();
  return {
    ...d,
    boundElements: [],
    id: el.id,
    type: "ellipse",
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    strokeColor: el.strokeColor ?? "#1e1e1e",
    backgroundColor: el.backgroundColor ?? "transparent",
    strokeWidth: el.strokeWidth ?? 1,
    roughness: el.roughness ?? 1,
    roundness: null,
  };
}

function migrateArrow(el) {
  const d = baseDefaults();
  const points = el.points || [
    [0, 0],
    [0, 0],
  ];
  const bbox = bboxFromPoints(points);
  const strokeStyle = el.strokeStyle === "dashed" ? "dashed" : "solid";

  return {
    ...d,
    boundElements: [],
    id: el.id,
    type: "arrow",
    x: el.x,
    y: el.y,
    width: el.width ?? bbox.width,
    height: el.height ?? bbox.height,
    strokeColor: el.strokeColor ?? "#1e1e1e",
    backgroundColor: el.backgroundColor ?? "#ffffff",
    strokeWidth: el.strokeWidth ?? 1,
    strokeStyle,
    roughness: el.roughness ?? 1,
    roundness: el.roundness ?? { type: 2 },
    points,
    startBinding: el.startBinding ?? null,
    endBinding: el.endBinding ?? null,
    startArrowhead: el.startArrowhead ?? null,
    endArrowhead: el.endArrowhead ?? "arrow",
    elbowed: el.elbowed ?? false,
    moveMidPointsWithElement: el.moveMidPointsWithElement ?? false,
  };
}

function assignIndices(elements) {
  let prev = null;
  return elements.map((el) => {
    const idx = generateKeyBetween(prev, null);
    prev = idx;
    return { ...el, index: idx };
  });
}

function stripLegacy(el) {
  const o = { ...el };
  delete o.createdAt;
  delete o.updatedAt;
  delete o.start;
  delete o.end;
  delete o.label;
  return o;
}

function main() {
  const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const elementsIn = raw.elements || [];
  const migrated = [];

  for (const el of elementsIn) {
    if (el.isDeleted) continue;

    if (el.type === "rectangle") {
      migrateRectangle(el).forEach((e) => migrated.push(stripLegacy(e)));
      continue;
    }
    if (el.type === "ellipse") {
      migrated.push(stripLegacy(migrateEllipse(el)));
      continue;
    }
    if (el.type === "arrow") {
      migrated.push(stripLegacy(migrateArrow(el)));
      continue;
    }
    if (el.type === "text") {
      migrated.push(stripLegacy(migrateText(el)));
      continue;
    }
    migrated.push(stripLegacy(el));
  }

  const elements = assignIndices(migrated);

  const out = {
    type: "excalidraw",
    version: raw.version ?? 2,
    source: "https://excalidraw.com",
    elements,
    appState: {
      gridSize: raw.appState?.gridSize ?? 20,
      gridStep: 5,
      gridModeEnabled: false,
      viewBackgroundColor: raw.appState?.viewBackgroundColor ?? "#ffffff",
      lockedMultiSelections: {},
      ...(raw.appState?.scrollX != null ? { scrollX: raw.appState.scrollX } : {}),
      ...(raw.appState?.scrollY != null ? { scrollY: raw.appState.scrollY } : {}),
      ...(raw.appState?.zoom != null ? { zoom: raw.appState.zoom } : {}),
    },
    files: raw.files ?? {},
  };

  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2));
  console.log("Wrote", outputPath, "with", elements.length, "elements");
}

main();
