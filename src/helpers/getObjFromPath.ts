export default function getObjFromPath(pathArray: string[], value: unknown): Indexed {
  return pathArray.reduceRight((acc, item) => ({ [item]: acc }), value as unknown as any);
}
