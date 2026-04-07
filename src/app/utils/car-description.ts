export interface DescriptionDetailItem {
  label: string;
  value: string;
}

const BULLET_PREFIX = /^[-*•]\s*/;

function cleanLine(line: string): string {
  return line.replace(BULLET_PREFIX, '').replace(/\s{2,}/g, ' ').trim();
}

function isDetailLine(line: string): boolean {
  const colonIndex = line.indexOf(':');
  return colonIndex > 0 && colonIndex < line.length - 1;
}

export function normalizeCarDescription(value: string | null | undefined): string {
  return (value ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(cleanLine)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getDescriptionDetailItems(
  value: string | null | undefined
): DescriptionDetailItem[] {
  return normalizeCarDescription(value)
    .split('\n')
    .map(cleanLine)
    .filter(isDetailLine)
    .map((line) => {
      const [label, ...rest] = line.split(':');

      return {
        label: label.trim(),
        value: rest.join(':').trim()
      };
    })
    .filter((item) => item.label && item.value);
}

export function getDescriptionNarrativeParagraphs(
  value: string | null | undefined
): string[] {
  return normalizeCarDescription(value)
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph
        .split('\n')
        .map(cleanLine)
        .filter((line) => line && !isDetailLine(line))
        .join('\n')
        .trim()
    )
    .filter(Boolean);
}

export function getDescriptionPreview(
  value: string | null | undefined,
  maxLength = 120
): string {
  const normalized = normalizeCarDescription(value);

  if (!normalized) {
    return 'No description added yet.';
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}
