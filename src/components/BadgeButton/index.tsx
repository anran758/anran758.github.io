import React, { FC } from 'react';
import { stringify } from 'query-string';

interface BadgeUrlFromPathProps {
  path: string;
  baseUrl?: string;
  queryParams?: { [k: string]: string | number | boolean };
  style?: string;
  format?: string;
  longCache?: boolean;
}

interface Props extends Omit<BadgeUrlFromPathProps, ''> {
  className?: string;
}

export function badgeUrlFromPath({
  baseUrl = '',
  path,
  queryParams,
  style,
  format = '',
  longCache = false,
}: BadgeUrlFromPathProps): string {
  const outExt = format.length ? `.${format}` : '';

  const outQueryString = stringify({
    cacheSeconds: longCache ? '2592000' : undefined,
    style,
    ...queryParams,
  });
  const suffix = outQueryString ? `?${outQueryString}` : '';

  return `${baseUrl}${path}${outExt}${suffix}`;
}

/**
 * shields button
 *
 * @desc 使用 shields 的服务: https://shields.io/category/social
 */
export const BadgeButton: FC<Props> = ({
  path,
  baseUrl = 'https://img.shields.io',
  queryParams,
  style = 'social',
  ...rest
}) => {
  return (
    <object
      {...rest}
      data={badgeUrlFromPath({ baseUrl, path, queryParams, style })}
    />
  );
};

BadgeButton.displayName = 'BadgeButton';
