import re
import json
from pathlib import Path

# 📄 QDKP Export 텍스트 파일 경로 설정
input_file = Path("QDKP2 - DKP Values of guild Style e.txt")
output_file = Path("converted_dkp_data.js")  # JS 파일로 저장

# 🔍 결과 리스트 초기화
dkp_data = []

# 🔎 플레이어 데이터 추출용 정규식 패턴 (QDKP Export 양식 기준)
pattern = re.compile(r"(.*?)\s+\|\s+(.*?)\s+\|\s+(.*?)\s+\|\s+(\d+)\s+\|\s+(\d+)")

# 📥 텍스트 파일 읽고 정규식으로 파싱
if input_file.exists():
    with input_file.open("r", encoding="utf-8") as f:
        for line in f:
            match = pattern.search(line)
            if match:
                name, clazz, rank, gain, spent = match.groups()
                dkp_data.append({
                    "name": name.strip(),
                    "class": clazz.strip(),
                    "rank": rank.strip(),
                    "gain": int(gain),
                    "spent": int(spent)
                })
else:
    print(f"❌ 파일을 찾을 수 없습니다: {input_file}")
    exit(1)

# 📤 자바스크립트 코드 형태로 저장
js_output = f"const data = {json.dumps(dkp_data, indent=2, ensure_ascii=False)};"
output_file.write_text(js_output, encoding="utf-8")

print("✅ 변환 완료: converted_dkp_data.js 파일이 생성되었습니다!")
print("👉 이 파일을 GitHub Pages 저장소에 올리고 index.html에서 <script src='converted_dkp_data.js'></script> 로 연결하세요!")
