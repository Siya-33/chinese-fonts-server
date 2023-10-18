import os
import json

def unicodeRangeToList(range):
  unicodes = []
  for uni in range:
    unicodes.append(int(uni[2:], 16))
  return unicodes

if __name__=='__main__':
  base = os.path.join(os.path.abspath('.'), 'lib')
 
  with open(f'{base}/unicode_ranges/Ma Shan Zheng.json') as f:
    unicodeRanges = json.load(f)

  ttfFiles = []
  for font in os.listdir(f'{base}/fonts'):
    for root, sub, files in os.walk(f'{base}/fonts/{font}'):
      for file in files:
        [fileName, ext] = file.split('.')
        if ext == 'ttf':
          ttfFiles.append({
            'fontName': font,
            'fontWeight': fileName.split('-')[-1],
            'fontPath': f'{root}/{file}',
            'fileName': fileName
          })
  
  for item in ttfFiles:
    rangesPath = f'{base}/fonts_chunk/{item["fontName"]}/{item["fontWeight"].lower()}'
    if not os.path.exists(rangesPath):
      os.makedirs(rangesPath)

  with open(f'{base}/fonts/metadata.json', 'w', encoding='utf-8') as f:
    json.dump(ttfFiles, f, ensure_ascii=False, indent=2)