import { TransformFnParams } from 'class-transformer';

export function trimStringArray(params: TransformFnParams) {
  const trimStringArray: string[] = [];
  params.value.forEach((item) => {
    trimStringArray.push(item.trim());
  });
  return trimStringArray;
}
