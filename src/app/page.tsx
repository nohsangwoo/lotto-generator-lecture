'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(1)
  const [numbers, setNumbers] = useState<number[][]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadingPhrase, setLoadingPhrase] = useState('로또 번호 생성중...')
  const [dots, setDots] = useState('...')

  const generateLottoNumbers = () => {
    setIsAnimating(true)
    const animationDuration = Math.random() * 2000 + 1000 // 1초 ~ 3초 사이의 랜덤 애니메이션 지속 시간
    setTimeout(() => {
      const newNumbers = []

      for (let i = 0; i < count; i++) {
        const set = new Set<number>()
        while (set.size < 7) {
          set.add(Math.floor(Math.random() * 45) + 1)
        }
        newNumbers.push(Array.from(set).sort((a, b) => a - b))
      }
      setNumbers(newNumbers)

      setIsAnimating(false)
    }, animationDuration)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8 flex flex-col items-center justify-center">
      {/* 로또 번호 생성기 */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-4xl font-bold text-gray-100 mb-4 sm:mb-8 text-center"
      >
        로또 번호 생성기
      </motion.h1>

      {/* 로또 번호 세트 수 선택 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-4 sm:mb-8 w-full max-w-md"
      >
        <label className="block text-gray-300 text-sm font-bold mb-2">
          생성할 로또 번호 세트 수:
        </label>
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={e => setCount(parseInt(e.target.value))}
            className="shadow apperance-none border bg-gray-700 border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight mr-2 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateLottoNumbers}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
          >
            번호 생성
          </motion.button>
        </div>
      </motion.div>
      {/* 로또 번호 생성 중 로딩 화면 또는 생성된 로또 번호 화면 */}
      <div className="w-full max-w-md text-white">
        {isAnimating ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-500 rounded-lg p-4 shadow-lg mb-4"
          >
            <div className="flex justify-center items-center h-40">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-20 h-20 bg-blue-500 rounded-full"
              ></motion.div>
            </div>
            <p className="text-center text-gray-400 mt-2">
              {loadingPhrase}
              <span className="inline-block w-8 text-left">{dots}</span>
            </p>
          </motion.div>
        ) : (
          numbers.map((numberSet, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4"
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {numberSet.slice(0, 6).map((num, i) => {
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: i * 0.1,
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-blue-500"
                      >
                        {num}
                      </motion.div>
                    )
                  })}
                  <span className="flex items-center text-gray-400 mx-1">
                    +
                  </span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.6,
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-red-500"
                  >
                    {numberSet[6]}
                  </motion.div>
                </div>
                <p className="text-center text-gray-400 mt-2">당첨번호</p>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
